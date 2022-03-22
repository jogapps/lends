let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../../app");
const knex = require("../../../../src/api/config/knex");

// Assertion style
chai.should();

chai.use(chaiHttp);


describe("Wallet Route API", () => {

    let token;
    let testUser1 = { email: "test1@gmail.com", password: "123456" };
    let testUser2 = { email: "test2@gmail.com", password: "123456" };

    before((done) => {
        chai.request(app)
            .post("/api/v1/user/login")
            .send(testUser1)
            .end((err, response) => {
                if (err) done(err);
                if (response.body.status)
                    token = response.body.data.token;
                done();
            });
    });

    describe("Fund Account (Personal)", () => {
        describe("post /api/v1/wallet/fund", () => {
            
            it("It should fail if header has no token", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Token is required")
                    done();
                });
            });

            it("It should fail if header token is incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund")
                .set('Authorization', "Wrong-token")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Invalid token found")
                    done();
                });
            });

            it("It should fail required body payload is null / incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund")
                .set('Authorization', token)
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    done();
                });
            });

            it("It should fund user's account if payload is correct", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund")
                .set('Authorization', token)
                .send({amount: 100})
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("Account funded successfully!")
                    done();
                });
            });
        });
    });

    describe("Fund Another User Account", () => {
        describe("post /api/v1/wallet/fund/user", () => {
            
            it("It should fail if header has no token", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund/user")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Token is required")
                    done();
                });
            });

            it("It should fail if header token is incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund/user")
                .set('Authorization', "Wrong-token")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Invalid token found")
                    done();
                });
            });

            it("It should fail required body payload is null / incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund/user")
                .set('Authorization', token)
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    done();
                });
            });

            it("It should fund receiver and withdraw from sender if payload is correct", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/fund/user")
                .set('Authorization', token)
                .send({amount: 50, reciever_email: testUser2.email})
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("User account funded successfully!")
                    done();
                });
            });
        });
    });

    describe("Withdraw From Account (Personal)", () => {
        describe("post /api/v1/wallet/withdraw", () => {
            
            it("It should fail if header has no token", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/withdraw")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Token is required")
                    done();
                });
            });

            it("It should fail if header token is incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/withdraw")
                .set('Authorization', "Wrong-token")
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Invalid token found")
                    done();
                });
            });

            it("It should fail required body payload is null / incorrect", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/withdraw")
                .set('Authorization', token)
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    done();
                });
            });

            it("It should return insufficient funds if amount is greater than wallet", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/withdraw")
                .set('Authorization', token)
                .send({amount: 100})
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    response.body.message.should.equal("Insufficient funds")
                    done();
                });
            });

            it("It should withdraw funds from account if payload is correct", (done) => {
                chai.request(app)
                .post("/api/v1/wallet/withdraw")
                .set('Authorization', token)
                .send({amount: 20})
                .end((err, response) => {
                    if(err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("Withdrawal processed successfully!")
                    done();
                });
            });
        });
    });

});