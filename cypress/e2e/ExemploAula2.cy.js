/// <reference = cypress>

describe("Testes da criação, registro e login", ()=>{
    it.skip("Teste de criação de usuario com sucesso", ()=>{
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type("Guga")
        cy.get('#Text1').type("Guga")
        cy.get('#username').type("Guga")
        cy.get('#password').type("Guga")
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should("contain.text", "Registration successful")
    })
    it.skip("Teste de criação de usuario com falha", ()=>{
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('.btn-link').click()
        cy.get('#firstName').type("Guga")
        cy.get('#Text1').type("Guga")
        cy.get('#username').type("Guga")
        cy.get('.btn-primary').should("be.disabled")
    })
    it.skip("Teste de Login com sucesso", ()=>{
        let infos = criarUser()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should("contain.text",infos[0])
    })
    it("Teste login com delete falha", ()=>{
        let infos = logarUser()
        cy.get('.ng-binding > a').click()
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")
    })
})

function criarUser(){
    let hora = new Date().getHours().toString()
    let minuto = new Date().getMinutes().toString()
    let seg = new Date().getSeconds().toString()
    let id = hora + minuto + seg + "ID"
    let senha = hora + minuto + seg + "Senha"
    let info = [id, senha]
    
    
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(id)
    cy.get('#Text1').type(id)
    cy.get('#username').type(id)
    cy.get('#password').type(senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")
    return info
}

function logarUser(){
    let infos = criarUser()
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(infos[0])
    cy.get('#password').type(infos[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should("contain.text",infos[0])
    return infos
}