Feature: Deve realizar a contagem de likes nos posts de determindo profile
    Scenario: Recebe o profileId como parâmetro

        Given profileId
            When Busca todos os posts com @postedBy igual ao profileId
                Then Retorna a contagem dos posts encontrados.