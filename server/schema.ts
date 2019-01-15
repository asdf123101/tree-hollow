import { gql } from 'apollo-server'

const carouselList = [
  {
    data:
      'Nulla non enim ut mi egestas rhoncus sed sed augue. Aenean ac feugiat risus, et pellentesque diam. In pretium lacus eget semper faucibus. Curabitur blandit nec lacus id posuere. Nunc ac ante volutpat, euismod lacus eu, laoreet dolor. Nulla congue leo eu eros finibus placerat. Pellentesque pretium vitae lacus ut rutrum. Proin sed lorem augue. Sed posuere, ipsum eu tempor pellentesque, orci lacus interdum magna, ac hendrerit nisi diam tempor erat. Integer porttitor mi vitae arcu faucibus fermentum eget non lacus.',
  },
  {
    data:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet porttitor nulla. Phasellus in feugiat odio, sit amet congue risus. Fusce vitae eros sapien. Aliquam non pretium dui. In suscipit imperdiet commodo. Aenean malesuada posuere viverra. Vestibulum ullamcorper nulla et mattis ullamcorper.',
  },
  {
    data:
      'Suspendisse ac felis leo. Curabitur tortor libero, aliquam ut mauris sit amet, cursus convallis elit. In vehicula a erat non varius. Sed a risus at urna egestas consectetur. Vivamus vel eleifend elit, in mattis nulla. Sed eu bibendum lorem, ut posuere lacus. Donec odio massa, luctus nec ligula non, fermentum efficitur felis. Donec non turpis non eros malesuada placerat. In eu libero suscipit leo rutrum rutrum in non est. Nulla interdum feugiat suscipit. Aliquam eu tellus non est pulvinar cursus. Integer lobortis, ipsum a bibendum pulvinar, risus dui euismod diam, eget lacinia diam augue vitae nisi.',
  },
  {
    data:
      'Fusce volutpat imperdiet efficitur. Vivamus nibh nulla, sollicitudin nec dolor in, feugiat tristique erat. Cras in consectetur magna, et ullamcorper orci. Aenean a quam turpis. Aliquam erat volutpat. Maecenas sodales vel est vel sollicitudin. Mauris accumsan ex nec sem euismod, ac faucibus lectus efficitur. Aliquam placerat augue odio. Aliquam erat volutpat. Suspendisse fringilla, turpis quis lacinia pulvinar, metus velit tempus neque, at mattis lorem quam fermentum nisi. Nam suscipit venenatis dignissim. Praesent bibendum enim id orci tincidunt porta. Nulla sem diam, pulvinar sit amet ipsum vitae, fermentum tincidunt elit.',
  },
]

// The GraphQL schema
export const typeDefs = gql`
  type Query {
    hollows: [hollow]
  }

  type hollow {
    data: String
  }
`

export const resolvers = {
  Query: {
    hollows: () => carouselList,
  },
}
