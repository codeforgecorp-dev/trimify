describe("Dashboard Edit Button Test", () => {
  beforeEach(() => {
    // Visit login page
    cy.visit("/login");

    // Fill login form
    cy.get("[data-testid='login-email']").type("Zain13");
    cy.get("[data-testid='login-password']").type("Zaink142@");

    // Submit login form
    cy.get("[data-testid='login-submit-btn']").click();

    // Wait for dashboard redirect
    cy.url().should("include", "/dashboard");
  });

  it("Should open Edit modal when Edit button clicked", () => {
    cy.get("[data-testid='edit-link-btn']").first().click();
    cy.get("[data-testid='edit-link-modal']").should("be.visible");
  });
});
