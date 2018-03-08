/*!
project-template-nodejs 0.0.0, built on: 2017-03-30
Copyright (C) 2017 ISA group
http://www.isa.us.es/
https://github.com/isa-group/project-template-nodejs

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

"use strict";

var config = require("./src/backend/configurations/config");

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.loadNpmTasks("grunt-release-github");

  grunt.loadNpmTasks("grunt-banner");

  grunt.loadNpmTasks("grunt-dockerize");

  grunt.loadNpmTasks("grunt-mocha-istanbul");

  grunt.loadNpmTasks("grunt-newman");

  grunt.loadNpmTasks("grunt-protractor-runner");

  // Project configuration.
  grunt.initConfig({
    //Load configurations
    pkg: grunt.file.readJSON("package.json"),
    licenseNotice: grunt.file
      .read("extra/license-notice", {
        encoding: "utf8"
      })
      .toString(),
    latestReleaseNotes: grunt.file
      .read("extra/latest-release-notes", {
        encoding: "utf8"
      })
      .toString(),

    //Add license notice and latest release notes
    usebanner: {
      license: {
        options: {
          position: "top",
          banner: "/*!\n<%= licenseNotice %>*/\n",
          replace: true
        },
        files: {
          src: ["src/**/*.js", "tests/**/*.js", "Gruntfile.js"] //If you want to inspect more file, you change this.
        }
      },
      readme: {
        options: {
          position: "bottom",
          banner: "## Copyright notice\n\n<%= latestReleaseNotes %>",
          replace: /##\sCopyright\snotice(\s||.)+/g,
          linebreak: false
        },
        files: {
          src: ["README.md"]
        }
      }
    },

    //Lint JS
    jshint: {
      all: [
        "Gruntfile.js",
        "src/**/*.js",
        "!**/frontend/report/**",
        "!**/frontend/coverage/**",
        "tests/**/*.js",
        "index.js"
      ], //If you want to inspect more file, you change this.
      options: {
        jshintrc: ".jshintrc"
      }
    },

    //Make a new release on github
    //"grunt release" for pacth version
    //"grunt release:minior" for minior version
    //"grunt release:major" for major version
    release: {
      options: {
        changelog: true, //NOT CHANGE
        githubReleaseBody: "See [CHANGELOG.md](./CHANGELOG.md) for details.", //NOT CHANGE
        npm: false, //CHANGE TO TRUE IF YOUR PROJECT IS A NPM MODULE
        //npmtag: true, //default: no tag
        beforeBump: [], // IS NOT READY YET
        afterBump: [], // IS NOT READY YET
        beforeRelease: [], // IS NOT READY YET
        afterRelease: [], // IS NOT READY YET
        updateVars: ["pkg"], //NOT CHANGE
        github: {
          repo: "isa-group/project-template-nodejs",
          accessTokenVar: "GITHUB_ACCESS_TOKEN", //SET ENVIRONMENT VARIABLE WITH THIS NAME
          usernameVar: "GITHUB_USERNAME" //SET ENVIRONMENT VARIABLE WITH THIS NAME
        }
      }
    },

    //IT IS RECOMENDED TO EXECUTE "grunt watch" while you are working.
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["jshint"]
      }
    },

    //Execute mocha tests and generate a coverage report
    mocha_istanbul: {
      full: {
        src: ["tests/**/*.test.js"],

        options: {
          mask: "*.test.js",
          istanbulOptions: ["--harmony", "--handle-sigint"],
          coverageFolder: "tests/backend/coverage"
        }
      }
    },

    newman: {
      default_options: {
        options: {
          iterationCount: 1,
          collection: "tests/backend/postman.json"
          //url: "https://www.getpostman.com/collections/c3d1fba63cf14cdfeb06"
        }
      }
    },

    protractor: {
      default_options: {
        options: {
          configFile: "tests/frontend/protractor-conf.js", // Default config file
          keepAlive: true, // If false, the grunt process stops when the test fails.
          noColor: false, // If true, protractor will not use colors in its output.
          args: {
            // Arguments passed to the command
          }
        }
      }
    },

    //USE THIS TASK FOR BUILDING AND PUSHING docker images
    dockerize: {
      "groups-service-latest": {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
          },
          name: "groups-service",
          push: true
        }
      },
      "groups-service-version": {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
          },
          name: "groups-service",
          tag: "<%= pkg.version %>",
          push: true
        }
      }
    }
  });

  grunt.registerTask("buildOn", function() {
    grunt.config("pkg.buildOn", grunt.template.today("yyyy-mm-dd"));
    grunt.file.write(
      "package.json",
      JSON.stringify(grunt.config("pkg"), null, 2)
    );
  });

  grunt.registerTask("import", "drop and import data", function() {
    var exec = require("child_process").execSync;
    var uri =
      "mongodb://" +
      config.urlMongo +
      ":" +
      config.portMongo +
      "/" +
      config.dbName;
    var fileLocation = "{yourTestFileLocation}";

    var result = exec(
      "mongoimport --uri " +
        uri +
        " --collection customGroups --drop --file " +
        fileLocation,
      { encoding: "utf8" }
    );
    grunt.log.writeln(result);
  });

  // Default task(s).
  grunt.registerTask("default", ["usebanner"]);

  //TEST TASK
  grunt.registerTask("test", [
    //   "jshint",
    "mocha_istanbul",
    "newman",
    "protractor"
  ]);

  //BUILD TASK
  grunt.registerTask("build", ["test", "buildOn", "usebanner", "dockerize"]);

  //DEVELOPMENT TASK
  grunt.registerTask("dev", ["watch"]);
};
