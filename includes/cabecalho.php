<?php

$tituloPagina = $tituloPagina
    ?? 'Mundo Pokémon';

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <meta
        name="description"
        content="Sistema de cadastro de treinadores do Mundo Pokémon."
    >

    <title>
        <?= htmlspecialchars(
            $tituloPagina,
            ENT_QUOTES,
            'UTF-8'
        ) ?>
    </title>

    <link
        rel="stylesheet"
        href="css/styles.css"
    >
</head>

<body class="pagina-resultado-cadastro">
    <a
        href="#conteudo-principal"
        class="skip-link"
    >
        Pular para o conteúdo principal
    </a>

    <header>
        <div class="header-container">
            <h1>Mundo Pokémon</h1>

            <nav aria-label="Navegação principal">
                <ul>
                    <li>
                        <a
                            href="index.html"
                            class="link-nav"
                        >
                            Página inicial
                        </a>
                    </li>

                    <li>
                        <a
                            href="pokedex.html"
                            class="link-nav"
                        >
                            Pokédex
                        </a>
                    </li>

                    <li>
                        <a
                            href="Quiz.html"
                            class="link-nav"
                        >
                            Quiz
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>