describe('Prova', () => {
  it('Entra no site, loga, compra 1 item e desloga', () => {
    cy.visit('https://www.saucedemo.com/')
    logarUsuarioFuncional()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    credenciaisCompra()
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="back-to-products"]').click()
    deslogarUsuario()
  })
  it('Tentar comprar sem colocar as credenciais (sem first name especificamente)', () => {
    cy.visit('https://www.saucedemo.com/')
    logarUsuarioFuncional()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should("contain.text", "Error: First Name is required")
  })
  it('Começar uma compra e excluir do carrinho a compra e ver se realmente é excluido', () => {
    cy.visit('https://www.saucedemo.com/')
    logarUsuarioFuncional()
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="remove-sauce-labs-fleece-jacket"]').click()
    cy.get('[data-test="inventory-item-name"]').should("not.exist")
  })
})

function logarUsuarioFuncional(){
  cy.get('[data-test="username"]').type("standard_user")
  cy.get('[data-test="password"]').type("secret_sauce")
  cy.get('[data-test="login-button"]').click()
}
function deslogarUsuario(){
  cy.get('#react-burger-menu-btn').click()
  cy.get('[data-test="logout-sidebar-link"]').click()
  cy.get('.login_logo').should("contain.text", "Swag Labs")
}
function credenciaisCompra(){
  cy.get('[data-test="firstName"]').type("comprador")
  cy.get('[data-test="lastName"]').type("teste")
  cy.get('[data-test="postalCode"]').type("xxxx-xxxxx")
  cy.get('[data-test="continue"]').click()
}