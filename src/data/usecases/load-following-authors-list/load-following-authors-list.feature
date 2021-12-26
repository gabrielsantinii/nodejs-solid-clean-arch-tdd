Feature: Deve retornar uma lista com o os Ids de cada autor seguido.
    Scenario: Recebe o followedBy, que deve ser utilizado como filtro

        Given followedBy
            When Busca autores seguidos pelo @followedBy
                Then Retorna uma lista com os Ids dos autores seguido.