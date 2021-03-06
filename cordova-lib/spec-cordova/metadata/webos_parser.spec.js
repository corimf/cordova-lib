/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
var webosParser = require('../../src/cordova/metadata/webos_parser'),
    util = require('../../src/cordova/util'),
    path = require('path'),
    shell = require('shelljs'),
    fs = require('fs'),
    config = require('../../src/cordova/config'),
    ConfigParser = require('../../src/configparser/ConfigParser');

var cfg = new ConfigParser(path.join(__dirname, '..', 'test-config.xml'));
describe('webos project parser', function() {
    var proj = path.join('some', 'path');
    var exists, exec, custom;
    beforeEach(function() {
        exists = spyOn(fs, 'existsSync').andReturn(true);
        exec = spyOn(shell, 'exec').andCallFake(function(cmd, opts, cb) {
            cb(0, '');
        });
        custom = spyOn(config, 'has_custom_path').andReturn(false);
    });

    describe('constructions', function() {
        it('should create an instance with a path', function() {
            expect(function() {
                var p = new webosParser(proj);
                expect(p.path).toEqual(proj);
            }).not.toThrow();
        });
    });

    describe('instance', function() {
        var p, cp, rm, is_cordova, write, read;
        var wos_proj = path.join(proj, 'platforms', 'webos');
        beforeEach(function() {
            p = new webosParser(wos_proj);
            cp = spyOn(shell, 'cp');
            rm = spyOn(shell, 'rm');
            is_cordova = spyOn(util, 'isCordova').andReturn(proj);
            write = spyOn(fs, 'writeFileSync');
            read = spyOn(fs, 'readFileSync').andReturn('');
        });

        describe('update_from_config method', function() {
            beforeEach(function() {
                cfg.name = function() { return 'testname'; };
                cfg.packageName = function() { return 'testpkg'; };
                cfg.version = function() { return '1.0'; };
            });

          /*  it('should write appinfo.json', function() {
                //p.update_from_config(cfg);
                //expect(write.mostRecentCall.args[0]).toEqual('appinfo.json');
            });*/
        });
    });
});
