exports.welcomge_msg = `
  <pre>
    Welcome to the Food Shop API!

    The following endpoints are available:

    POST /api/v1.0/calculate
      USAGE:
        Used for calculate burger's price
      PARAMS:
        name - String: burger name or "custom"
        ingredients - Array: used only for "custom" burgers

    GET /api/v1.0/ingredients
      USAGE:
        Get ingredients and its price

    POST /api/v1.0/ingredients
      USAGE:
        Used for create a new ingredient
      PARAMS:
        name - String: ingredient's name (mandatory)
        price - Number: ingredient's price (mandatory)

    PUT /api/v1.0/ingredients
      USAGE:
        Used for update an ingredient
      PARAMS:
        name - String: ingredient's name (mandatory)
        price - Number: ingredient's price (mandatory)

    DELETE /api/v1.0/ingredients
      USAGE:
        Used for delete an ingredient
      PARAMS:
        name - String: ingredient's name (mandatory)

    GET /api/v1.0/burgers
      USAGE:
        Get burgers and its ingredients

    POST /api/v1.0/burgers
      USAGE:
        Used for add a new burger to the menu
      PARAMS:
        name - String: burger's name (mandatory)
        ingredients - Array: ingredients necessary to make this burger. They must exist in ingredients list (mandatory)

    PUT /api/v1.0/burgers
      USAGE:
        Used for update a burger
      PARAMS:
        name - String: burger's name (mandatory)
        ingredients - Array: ingredients necessary to make this burger. They must exist in ingredients list (mandatory)

    DELETE /api/v1.0/burgers
      USAGE:
        Used for delete a burger
      PARAMS:
        name - String: burger's name (mandatory)

  </pre>
`