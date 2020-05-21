const bcrypt = require('bcrypt')

async function run() {
  const salt = await bcrypt.genSalt(10) //this is the salt $2b$10$IJBuyaksZWWK3N9uVluEgO

  const hashed = await bcrypt.hash('1234password', salt) //$2b$10$B3D3IpBO2BfyljTRzFrimenkPSMOzr67n6fcEcen0ejPC7m/01EFe
  //* salt is included in the hashed.
  // When we authenticate the user we want to validate their user name and password.
  // The user sends it in plain text and we need to hash ig again, but we need the
  // original salt that was used to generate this hash.

  console.log(salt)
  console.log(hashed)
}

run()