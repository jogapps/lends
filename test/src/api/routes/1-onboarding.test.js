let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../../../../app");
const knex = require("../../../../src/api/config/knex");

// Assertion style
chai.should();

chai.use(chaiHttp);

describe("Account Creation Route", () => {
    
    before(async () => {
        await knex('users').del();
    });

    describe("post /api/v1/user/register", () => {
        let testUser1 = {email: "test1@gmail.com", password: "123456"};
        let testUser2 = {email: "test2@gmail.com", password: "123456"};

        it("It should fail if email or password required body parameters is null", (done) => {
            chai.request(app)
                .post("/api/v1/user/register")
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(500);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(false);
                    done();
                });
        });

        it("It should Create account if payload is valid", (done) => {
            chai.request(app)
                .post("/api/v1/user/register")
                .send(testUser1)
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("Account created successfully!");
                    done();
                });
        });

        it("It should Create another account if payload is valid", (done) => {
            chai.request(app)
                .post("/api/v1/user/register")
                .send(testUser2)
                .end((err, response) => {
                    if (err) done(err);
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.status.should.equal(true);
                    response.body.message.should.equal("Account created successfully!");
                    done();
                });
        });
    });
});