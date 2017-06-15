// SKARYTRICU
// // MORJI
// Four ways to represent a tree
// a. an individu is INDEED wrapped with []. children of this individu and the individu itself are INDEED wrapped with []
// b. an individu is NOT wrapped with []. children of this individu and the individu itself are INDEED wrapped with []
// c. an individu is NOT wrapped with []. children of this individu and the individu itself are NOT wrapped with [] ⦅but orderly concatenated⦆
// d. an individu is INDEED wrapped with []. children of this individu and the individu itself are NOT wrapped with [] ⦅but orderly concatenated⦆
// All of these represent the tree bb
// Eve Cain Seth Enos Noam Abel Awan Enoch Azura

bba = [["Eve"], [["Cain"], [["Seth"], [["Enos"], ["Noam"]]], ["Abel"], [["Awal"], [["Enoch"]]], ["Azura"] ] ]
bbb = ["Eve",["Cain",["Seth",["Enos","Noam"]],"Abel",["Awan",["Enoch"]],"Azura"] ]
bbc = ["Eve",["Cain","Seth",["Enos","Noam"],"Abel","Awan",["Enoch"],"Azura"] ]
bbd = [["Eve"], [["Cain"], ["Seth"], [["Enos"], ["Noam"]], ["Abel"], ["Awal"], [["Enoch"]], ["Azura"] ] ]

bb = {"name":"Eve",
	"children":[
		{"name":"Cain"},
		{"name":"Seth",
			"children":[
				{"name":"Enos"},
				{"name":"Noam"}
			]
		},
		{"name":"Abel"},
		{"name":"Awan",
			"children":[
				{"name":"Enoch"}
			]},
		{"name":"Azura"}
	]
}

// Now eight algorithm, separated in two groups.. those which convert the representation to bb, and those which let the representation ⦅aka cipher⦆ as if

//console.log(JSON.stringify(simplifyTree(bb),undefined,1))



// // CIRFESTI
con = function(ast) {
    var retObj = {name:"root",children: []};;
    for (var i = 0; i < ast.length; i++) {
      if (typeof ast[i] === 'string') {
        retObj.children.push({name: ast[i]})
      }
      if (Array.isArray(ast[i])) {
        retObj.children.push(con(ast[i]));
      }
    }
  return retObj;
}

can = function(ast) {
    var retObj = {children: []};
    for (var i = 0; i < ast.length; i++) {
      if (typeof ast[i] === 'string') {
        retObj.children.push({name: ast[i]})
      }
      if (Array.isArray(ast[i])) {
        retObj.children.push(can(ast[i]));
      }
    }
  return retObj;
}

cin = function(x) {
  var str = true;
  var ret = []
  for (var i = 0; i < x.length; i++) {
      str = str && (typeof x[i] === 'string')
      ret.push({name: x[i]})
  }
  if (str) {
    return ret
  }
  
  if (isString(x[0])) {
      ret = arcin(x.slice(1));
  } else {
      ret = arcin(x);
  }
  return ret;
}

function arcin(parse) {
    var result = [];
    for (var i in parse) {
        result = result.concat(cin(parse[i]));
    }
    return result;
}

function isString(s) {
    return typeof(s) === 'string' || s instanceof String;
}

function simplifyTree(parse) {
    if (isString(parse[0])) {
      return [simplifyFunctions(parse)]
    }
    var result;
    if (isString(parse[0])) {
        result = simplifyArrayOfTrees(parse.slice(1));
    } else {
        result = simplifyArrayOfTrees(parse);
    }
    
    return result;
}

function simplifyArrayOfTrees(parse) {
    var result = [];
    for (var i in parse) {
        result = result.concat(simplifyTree(parse[i]));
    }
    return result;
}

simplifyFunctions = function(parse) {
    return {
        name: parse,
        children: simplifyArrayOfTrees(parse.slice(1))
    }
}

module.exports.isString = isString
module.exports.simplifyTree = simplifyTree;
module.exports.simplifyArrayOfTrees = simplifyArrayOfTrees;
module.exports.cin = cin
module.exports.con = con
module.exports.can = can
