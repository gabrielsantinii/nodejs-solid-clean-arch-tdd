Feature: Cria perfil no banco de dados e retorna os dados criados, junto ao ID
    Scenario: Recebe os dados do perfil

        Given Dados do perfil - @ProfileModel
            When Faz a inserção no banco
                And Captura os dados criados, junto ao ID
                    Then Retorna os dados do perfil criado.