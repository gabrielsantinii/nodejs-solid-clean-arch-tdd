Feature: Verifica a existência de um perfil pelo seu username
    Scenario: Recebe um username e realiza a busca

        Given username
            When Faz a busca do username
                Then Retorna um booleano, se existe ou não.