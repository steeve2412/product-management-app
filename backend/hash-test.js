const bcrypt = require('bcryptjs');

const password = 'examplePassword123'; // The password you are testing
bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) console.error(err);
        console.log('Generated hash:', hash);

        // Now compare the generated hash with the original password
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err) {
                console.error('Error comparing:', err);
            } else if (isMatch) {
                console.log('Password matches!');
            } else {
                console.log('Password does not match!');
            }
        });
    });
});
