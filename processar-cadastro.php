<?php

require __DIR__ . '/config/conexao.php';

/**
 * Escapa textos antes de exibi-los no HTML,
 * protegendo a página contra XSS.
 */
function escapar(string $valor): string
{
    return htmlspecialchars(
        $valor,
        ENT_QUOTES,
        'UTF-8'
    );
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método não permitido.');
}

/*
 * Popula as variáveis com os valores enviados
 * pelo formulário da página principal.
 */
$nome = trim($_POST['nome'] ?? '');
$senha = $_POST['senha'] ?? '';

$nivel = filter_input(
    INPUT_POST,
    'nivel',
    FILTER_VALIDATE_INT
);

$email = trim($_POST['email'] ?? '');
$perfilUrl = trim($_POST['perfil'] ?? '');
$motivacao = trim($_POST['mensagem'] ?? '');

$novidades = isset($_POST['novidades']);

$experiencia = trim(
    $_POST['experiencia'] ?? ''
);

$regiao = trim($_POST['regiao'] ?? '');

$dataNascimento = trim(
    $_POST['data-nascimento'] ?? ''
);

$horario = trim($_POST['horario'] ?? '');
$cor = trim($_POST['cor'] ?? '');
$termosAceitos = isset($_POST['termos']);

/*
 * Arrays usados para validar as opções permitidas.
 */
$experienciasPermitidas = [
    'iniciante',
    'intermediario',
    'avancado'
];

$regioesPermitidas = [
    'kanto',
    'johto',
    'hoenn',
    'sinnoh',
    'unova',
    'kalos',
    'alola',
    'galar',
    'paldea'
];

/*
 * Array que reúne todas as mensagens de erro.
 */
$erros = [];

if (
    mb_strlen($nome) < 3 ||
    mb_strlen($nome) > 80
) {
    $erros[] =
        'O nome deve possuir entre 3 e 80 caracteres.';
}

if (
    mb_strlen($senha) < 8 ||
    mb_strlen($senha) > 30
) {
    $erros[] =
        'A senha deve possuir entre 8 e 30 caracteres.';
}

if (
    $nivel === false ||
    $nivel < 1 ||
    $nivel > 100
) {
    $erros[] =
        'O nível deve estar entre 1 e 100.';
}

if ($email !== '') {
    if (
        !filter_var(
            $email,
            FILTER_VALIDATE_EMAIL
        ) ||
        mb_strlen($email) > 150
    ) {
        $erros[] = 'Informe um e-mail válido.';
    }
}

if ($novidades && $email === '') {
    $erros[] =
        'O e-mail é obrigatório para receber novidades.';
}

if ($perfilUrl !== '') {
    $urlValida = filter_var(
        $perfilUrl,
        FILTER_VALIDATE_URL
    );

    $usaHttps = str_starts_with(
        strtolower($perfilUrl),
        'https://'
    );

    if (!$urlValida || !$usaHttps) {
        $erros[] =
            'O link deve ser uma URL válida iniciada por https://.';
    }
}

if (
    mb_strlen($motivacao) < 10 ||
    mb_strlen($motivacao) > 500
) {
    $erros[] =
        'A motivação deve possuir entre 10 e 500 caracteres.';
}

if (
    !in_array(
        $experiencia,
        $experienciasPermitidas,
        true
    )
) {
    $erros[] =
        'Selecione uma experiência válida.';
}

if (
    !in_array(
        $regiao,
        $regioesPermitidas,
        true
    )
) {
    $erros[] =
        'Selecione uma região válida.';
}

/*
 * Validação da data e da idade do treinador.
 */
$dataObjeto = DateTimeImmutable::createFromFormat(
    '!Y-m-d',
    $dataNascimento
);

$dataValida =
    $dataObjeto !== false &&
    $dataObjeto->format('Y-m-d') === $dataNascimento;

if (!$dataValida) {
    $erros[] =
        'Informe uma data de nascimento válida.';
} else {
    $hoje = new DateTimeImmutable('today');

    if ($dataObjeto > $hoje) {
        $erros[] =
            'A data de nascimento não pode estar no futuro.';
    } else {
        $idade = $dataObjeto->diff($hoje)->y;

        if ($idade < 10 || $idade > 120) {
            $erros[] =
                'O treinador deve ter entre 10 e 120 anos.';
        }
    }
}

if (
    !preg_match(
        '/^(?:[01]\d|2[0-3]):[0-5]\d$/',
        $horario
    )
) {
    $erros[] =
        'Informe um horário válido.';
}

if (
    !preg_match(
        '/^#[0-9a-fA-F]{6}$/',
        $cor
    )
) {
    $erros[] =
        'Informe uma cor válida.';
}

if (!$termosAceitos) {
    $erros[] =
        'É necessário confirmar as informações.';
}

$cadastroRealizado = false;

if ($erros === []) {
    /*
     * A senha nunca é armazenada diretamente.
     * Somente seu hash seguro é salvo no banco.
     */
    $senhaHash = password_hash(
        $senha,
        PASSWORD_DEFAULT
    );

    try {
        /*
         * Consulta parametrizada para impedir SQL Injection.
         */
        $comando = $pdo->prepare(
            'INSERT INTO treinadores (
                nome,
                senha_hash,
                nivel,
                email,
                perfil_url,
                motivacao,
                novidades,
                experiencia,
                regiao,
                data_nascimento,
                horario_preferido,
                cor_uniforme,
                termos_aceitos
            ) VALUES (
                :nome,
                :senha_hash,
                :nivel,
                :email,
                :perfil_url,
                :motivacao,
                :novidades,
                :experiencia,
                :regiao,
                :data_nascimento,
                :horario_preferido,
                :cor_uniforme,
                :termos_aceitos
            )'
        );

        $comando->execute([
            'nome' => $nome,
            'senha_hash' => $senhaHash,
            'nivel' => $nivel,
            'email' => $email !== ''
                ? $email
                : null,
            'perfil_url' => $perfilUrl !== ''
                ? $perfilUrl
                : null,
            'motivacao' => $motivacao,
            'novidades' => $novidades
                ? 1
                : 0,
            'experiencia' => $experiencia,
            'regiao' => $regiao,
            'data_nascimento' => $dataNascimento,
            'horario_preferido' => $horario,
            'cor_uniforme' => $cor,
            'termos_aceitos' => 1
        ]);

        $cadastroRealizado = true;
        http_response_code(201);
    } catch (PDOException $erro) {
        if ($erro->getCode() === '23000') {
            $erros[] =
                'O e-mail informado já está cadastrado.';

            http_response_code(409);
        } else {
            $erros[] =
                'Ocorreu um erro ao salvar o cadastro.';

            http_response_code(500);
        }
    }
} else {
    http_response_code(422);
}

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Resultado do cadastro</title>

    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <main>
        <?php if (!$cadastroRealizado): ?>
            <h1>Cadastro não realizado</h1>

            <p>
                Corrija os seguintes problemas:
            </p>

            <ul>
                <?php foreach ($erros as $mensagemErro): ?>
                    <li>
                        <?= escapar($mensagemErro) ?>
                    </li>
                <?php endforeach; ?>
            </ul>

            <p>
                <a href="index.html#contato">
                    Voltar ao formulário
                </a>
            </p>
        <?php else: ?>
            <h1>Cadastro realizado com sucesso!</h1>

            <p>
                <strong>Nome:</strong>
                <?= escapar($nome) ?>
            </p>

            <p>
                <strong>Nível:</strong>
                <?= escapar((string) $nivel) ?>
            </p>

            <p>
                <strong>E-mail:</strong>
                <?= escapar(
                    $email !== ''
                        ? $email
                        : 'Não informado'
                ) ?>
            </p>

            <p>
                <strong>Experiência:</strong>
                <?= escapar($experiencia) ?>
            </p>

            <p>
                <strong>Região:</strong>
                <?= escapar($regiao) ?>
            </p>

            <p>
                <strong>Motivação:</strong>
                <?= escapar($motivacao) ?>
            </p>

            <p>
                <strong>Receber novidades:</strong>
                <?= $novidades ? 'Sim' : 'Não' ?>
            </p>

            <p>
                <a href="index.html">
                    Voltar à página inicial
                </a>
            </p>
        <?php endif; ?>
    </main>
</body>
</html>