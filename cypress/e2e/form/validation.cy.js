/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("submit button should be deactivated when the form is invalid", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:5173/contact");
    cy.get("button").contains("Kontaktskjema").click();
  });

  it("invalid by default", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get("button[type=submit]").should("have.attr", "disabled");
  });

  it("can be filled out to be valid", () => {
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=email]").type("some.mail@gmail.com");
    cy.get("input[name=message]").type("Hello, World");

    // Now that we've filled out the form, the submit button should be enabled
    cy.get("button[type=submit]").should("not.have.attr", "disabled");
  });

  it("gives the right status when submitting", () => {
    cy.get("input[name=name]").type("John Doe");
    cy.get("input[name=email]").type("some.mail@gmail.com");
    cy.get("input[name=message]").type("Hello, World");

    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.get("div#status").should("have.text", "Status: 201");
  });
});
