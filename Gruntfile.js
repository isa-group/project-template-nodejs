/*!

governify-registry 3.0.1, built on: 2017-05-08

Copyright (C) 2017 ISA group

http://www.isa.us.es/

https://github.com/isa-group/governify-registry



governify-registry is an Open-source software available under the 

GNU General Public License (GPL) version 2 (GPL v2) for non-profit 

applications; for commercial licensing terms, please see README.md 

for any inquiry.



This program is free software; you can redistribute it and/or modify

it under the terms of the GNU General Public License as published by

the Free Software Foundation; either version 2 of the License, or

(at your option) any later version.



This program is distributed in the hope that it will be useful,

but WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the

GNU General Public License for more details.



You should have received a copy of the GNU General Public License

along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.loadNpmTasks("grunt-mocha-test");

  grunt.loadNpmTasks("grunt-release-github");

  grunt.loadNpmTasks("grunt-banner");

  grunt.loadNpmTasks("grunt-dockerize");

  grunt.loadNpmTasks("grunt-mocha-istanbul");

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
      all: ["Gruntfile.js", "src/**/*.js", "tests/**/*.js", "index.js"], //If you want to inspect more file, you change this.

      options: {
        jshintrc: ".jshintrc"
      }
    },

    //Execute mocha tests

    mochaTest: {
      full: {
        options: {
          reporter: "spec",

          //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file

          quiet: false, // Optionally suppress output to standard out (defaults to false)

          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)

          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },

        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ]
      },

      database: {
        options: {
          reporter: "spec",

          //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file

          quiet: false, // Optionally suppress output to standard out (defaults to false)

          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)

          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },

        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/01-database/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ]
      },

      unit: {
        options: {
          reporter: "spec",

          //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file

          quiet: false, // Optionally suppress output to standard out (defaults to false)

          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)

          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },

        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/02-unit/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ]
      },

      controllers: {
        options: {
          reporter: "spec",

          //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file

          quiet: false, // Optionally suppress output to standard out (defaults to false)

          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)

          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },

        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/03-controllers/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ]
      },

      integral: {
        options: {
          reporter: "spec",

          //captureFile: 'test.results<%= grunt.template.today("yyyy-mm-dd:HH:mm:ss") %>.txt', // Optionally capture the reporter output to a file

          quiet: false, // Optionally suppress output to standard out (defaults to false)

          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)

          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },

        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/04-integral/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ]
      }
    },

    //Make a new release on github

    //"grunt release" for patch version

    //"grunt release:minor" for minor version

    //"grunt release:major" for major version

    release: {
      options: {
        packageObject: "pkg",

        changelog: true, //NOT CHANGE

        changelogFromGithub: true, //NOT CHANGE

        githubReleaseBody: "See [CHANGELOG.md](./CHANGELOG.md) for details.", //NOT CHANGE

        npm: false, //CHANGE TO TRUE IF YOUR PROJECT IS A NPM MODULE

        //npmtag: true, //default: no tag

        afterBump: ["usebanner"],

        updateVars: ["pkg"], //NOT CHANGE

        github: {
          repo: "isa-group/governify-registry",

          accessTokenVar: "GITHUB_ACCESS_TOKEN", //SET ENVIRONMENT VARIABLE WITH THIS NAME

          usernameVar: "GITHUB_USERNAME" //SET ENVIRONMENT VARIABLE WITH THIS NAME
        }
      }
    },

    //IT IS RECOMMENDED TO EXECUTE "grunt watch" while you are working.

    watch: {
        scripts: {
            files: ['src/**/*.js'],
            tasks: ['jshint']
        }
    },

    //USE THIS TASK FOR BUILDING AND PUSHING docker images

    dockerize: {
      "governify-registry-latest": {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME

            username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME

            password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
          },

          name: "governify-registry",

          push: true
        }
      },

      "governify-registry-version": {
        options: {
          auth: {
            email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME

            username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME

            password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
          },

          name: "governify-registry",

          tag: "<%= pkg.version %>",

          push: true
        }
      }
    },

    mocha_istanbul: {
      full: {
        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ],

        options: {
          mask: "*.test.js",

          istanbulOptions: ["--harmony", "--handle-sigint"],

          coverageFolder: "public/coverage"
        }
      },

      database: {
        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/01-database/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ],

        options: {
          mask: "*.test.js",

          istanbulOptions: ["--harmony", "--handle-sigint"],

          coverageFolder: "public/coverage"
        }
      },

      unit: {
        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/02-unit/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ],

        options: {
          mask: "*.test.js",

          istanbulOptions: ["--harmony", "--handle-sigint"],

          coverageFolder: "public/coverage"
        }
      },

      controllers: {
        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/03-controllers/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ],

        options: {
          mask: "*.test.js",

          istanbulOptions: ["--harmony", "--handle-sigint"],

          coverageFolder: "public/coverage"
        }
      },

      integral: {
        src: [
          "tests/01-pre-test/**/*.test.js",
          "tests/02-test-cases/04-integral/**/*.test.js",
          "tests/03-post-test/**/*.test.js"
        ],

        options: {
          mask: "*.test.js",

          istanbulOptions: ["--harmony", "--handle-sigint"],

          coverageFolder: "public/coverage"
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

  // Default task(s).

  grunt.registerTask("default", ["jshint", "usebanner"]);

  //TEST TASK

  grunt.registerTask("test", ["jshint", "mochaTest:full"]);

  grunt.registerTask("test:full", ["jshint", "mochaTest:full"]);

  grunt.registerTask("test:database", ["jshint", "mochaTest:database"]);

  grunt.registerTask("test:unit", ["mochaTest:unit"]);

  grunt.registerTask("test:controllers", ["jshint", "mochaTest:controllers"]);

  grunt.registerTask("test:integral", ["jshint", "mochaTest:integral"]);

  //TEST AND COVERAGE TASK

  grunt.registerTask("coverage", ["jshint", "mocha_istanbul:full"]);

  grunt.registerTask("coverage:full", ["jshint", "mocha_istanbul:full"]);

  grunt.registerTask("coverage:database", [
    "jshint",
    "mocha_istanbul:database"
  ]);

  grunt.registerTask("coverage:unit", ["mocha_istanbul:unit"]);

  grunt.registerTask("coverage:controllers", [
    "jshint",
    "mocha_istanbul:controllers"
  ]);

  grunt.registerTask("coverage:integral", [
    "jshint",
    "mocha_istanbul:integral"
  ]);

  //BUILD TASK

  grunt.registerTask("build", ["test", "buildOn", "usebanner"]);

  grunt.registerTask("deliver", ["dockerize"]);

  //DEVELOPMENT TASK

  grunt.registerTask("dev", ["watch"]);
};
