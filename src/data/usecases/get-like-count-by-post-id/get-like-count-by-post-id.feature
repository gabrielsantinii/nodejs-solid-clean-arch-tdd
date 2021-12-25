Feature: Deve realizar a contagem de likes em determinado post
    Scenario: Recebe um postId existente

        Given postId
            When Realiza a contagem de registros de @likes que há no post
                Then Retorna um numérico referente a quantidade de likes