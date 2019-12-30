# Overall structure
* Two security domains: website service, and game sandbox
* Website is hosted by an ordinary Node.JS/Postgres service
  * Allows viewing/browsing games, signing up for accounts, etc.
  * Manages starting games (e.g. multiplayer matchmaking)
    * Does not host the actual games; serves an iframe pointing at game sandbox
  * Manages access to game code
    * Does not host the actual game code; serves instructions for using SFTP
* In game sandbox, custom C++ service embedding V8 hosts the actual games
  * Hosts an HTML page embedded in an iframe hosted by the Node.JS service
  * Hosts websockets
  * Reads in game code files from local filesystem
* In game sandbox, SFTP daemon allows access to the game code
  * Lives in the same container as the custom C++ service, allows updating the
    game code files that the C++ service reads from
* In game sandbox, Node.JS sidecar service
  * Exposes an API to website service
    * Allows sending code into game sandbox
    * Allows starting/stopping games
  * Launches and manages C++ service processes
    * Might communicate through the filesystem, or might expose a local API
      that C++ service calls into
  * Calls into Node.JS sidecar service on website domain
* In website domain, Node.JS sidecar service
  * Exposes an API to Node.JS sidecar service in game sandbox
  * Exists to let game sandbox put things into Postgres without giving it direct
    access
  * Might be in the same monolith as the website service itself?

# Security model
* Threats:
  * Internet-facing custom C++ services are scary
  * Despite V8's security features, large attack surface of untrusted JS against
    custom C++ code
  * SFTP's security features are mostly hardened against people who do not have
    a valid login, not so much against malicious users with a valid login
* Layers of defense:
  * All the main threats live in the game sandbox, which cannot access the
    website service except via a hardened API
  * Custom C++ service is jailed, only allowed to:
    * Serve HTTP + websockets
    * Read limited parts of local filesystem
    * Call into website service' API
  * SFTP daemon is jailed, only allowed to:
    * Read/write limited parts of local filesystem
* Open questions
  * Does game sandbox terminate its own HTTPS? If so, how to avoid leaking
    private keys if game sandbox is compromised? Might need to set up an nginx
    proxy or something to do HTTPS termination instead.
    * nginx proxy might also be useful for routing requests to multiple
      instances of game sandbox

# Interface of custom C++ service
* Command-line args:
  * Directory with game code, assets, etc.
  * Port to listen on
* Automatically reloads if game code, assets, etc. changed
  * Also pushes changes to connected clients
* 
