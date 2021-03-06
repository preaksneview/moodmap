var Nightmare = require("nightmare");
var expect = require("chai").expect;
var moodMapServer = require("../server.js");

//Run local server first and set up email to be "mctest@test.com" with password "test" so that the test can sign in
//Close out and run "npm test"

describe("moodMap", function () {
    //setting timeout to 30 sec for now, default is 2
    this.timeout(30000);
    it("Should send user to sign in page to survey, then profile", function (done) {
        Nightmare({
                show: true
            })
            .viewport(1000, 700)
            //go to local server host page
            .goto("http://localhost:3000")
            //enter email
            .type("#email", "mctest@test.com")
            //enter password
            .type("#password", "test")
            //click submit
            .click("#submit_button")
            .goto("http://localhost:3000/survey")
            .wait(1000)
            //Clicks on radio button for Somewhat Unhappy
            .click('input[type="radio"][name="likert1"][value="2"]')
            .wait(500)
            //Clicks on radio button for Lots of Energy
            .click('input[type="radio"][name="likert2"][value="3"]')
            .wait(500)
            //Scroll to bottom of page
            .scrollTo(600, 0)
            .wait(500)
            //Clicks on radio button for Agree
            .click('input[type="radio"][name="likert3"][value="3"]')
            .wait(500)
            //Clicks on radio button for No
            .click('input[type="radio"][name="likert4"][value="0"]')
            .wait(500)
            //Clicks on radio button for Disagree
            .click('input[type="radio"][name="likert5"][value="2"]')
            .wait(2000)
            //click submit button for survey
            .click('button[class="btn"]')
            .wait(2000)
            //Scroll down dashboard page to see results
            .scrollTo(600, 0)
            .wait(2000)
            .scrollTo(1000, 0)
            .wait(2000)
            .scrollTo(1800, 0)
            .wait(2000)
            //evaulate title of document
            .evaluate(function () {
                return document.title;
            })
            .end()
            .then(function (title) {
                expect(title).to.equal('moodMap | Your Profile');
                done();
            }).catch(done);
    });
    it("Should close the server", function (done) {
        moodMapServer.closeServer();
        done();
    });
});