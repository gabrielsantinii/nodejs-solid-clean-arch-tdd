Feature: Deve retornar uma lista com o os Ids de cada autor seguido.
    Scenario: Recebe o followingId, que deve ser utilizado como filtro

        Given followingId
            When Busca autores seguidos pelo @followingId
                Then Retorna uma lista com os Ids dos autores seguido.