//- app/server/global.js
/*
 * Copyright 25-Feb-2017 ºDeme
 * GNU General Public License - V3 <http://www.gnu.org/licenses/>
 */
/*global jdm */


function authentication (data) { // eslint-disable-line
  var server = jdm.mkServer();
  return server.authRq(data);
}
