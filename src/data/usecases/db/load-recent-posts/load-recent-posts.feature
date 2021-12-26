Feature: Deve realizar a busca dos posts recentes de seus autores seguidos
    Scenario: Recebe uma lista de autores seguidos e deve retornar os posts recentes dos mesmos

        Given authorsIds
            When Faz a busca no banco de dados sobre os posts recentes dos autores listados
                Then Retorna uma lista de posts