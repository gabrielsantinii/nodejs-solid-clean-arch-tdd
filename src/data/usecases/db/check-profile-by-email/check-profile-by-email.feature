Feature: Verifica a existência de um perfil pelo seu email
    Scenario: Recebe um email e realiza a busca

        Given email
            When Faz a busca do email
                Then Retorna um booleano, se existe ou não.