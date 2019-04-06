module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) { //interface renders index.ejs file.
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {//isLoggedIn is a helper method that enables the function to run
         db.collection('bikes').find().toArray((err, result) => {
          if (err) return console.log(err)

        db.collection('stations').find().toArray((err, locations) => {
          if (err) return console.log(err)

        res.render('profile.ejs', {
          user : req.user,
          messages: result,
          stations:locations
        })

          })

        })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {// this route needs to match the action on the form
      db.collection('bikes').save({name: req.body.name, msg: req.body.msg}, (err, result) => {//thumbUp and thumbDown are hardcoded but name and msg are coming from inputs in the same form
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')// trggering a get which is a new url
      })
    })

    app.put('/messages', (req, res) => {
      db.collection('bikes')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.post('/borrow', (req, res) => {
      db.collection('stations')
      .findOneAndUpdate(
        { "name" : req.body.station },
      {$push: { loans: req.body.userid }},
      (err, result) => {
        console.log(err, result);
       if (err) return res.send(err)
       res.redirect('/profile')
     })
    })

    app.delete('/messages', (req, res) => {
      db.collection('bikes').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
