Feature: Deve buscar um Profile pelo seu ID

    Scenario: Recebe um profileId existente
        
        Given profileId
            When Faz a busca no banco de dados pelo ID
                Then Retorna os dados do perfil encontrado

    Scenario: Recebe um profileId NÃO existente
        
        Given profileId
            When Faz a busca no banco de dados pelo ID
                Then retorna undefined