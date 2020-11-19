"use strict";

const f = new CNF();

const A = f.addAtom("A");
const B = f.addAtom("B");
const C = f.addAtom("C");
const D = f.addAtom("D");

f.addClause([-A, B, C]);
f.addClause([A, C, D]);
f.addClause([A, C, -D]);
f.addClause([A, -C, D]);
f.addClause([A, -C, -D]);
f.addClause([-B, -C, D]);
f.addClause([-A, B, -C]);
f.addClause([-A, -B, C]);

console.log(dpll(f));

//const g = new CNF();
//
//const P1 = g.addAtom("P1");
//const P2 = g.addAtom("P2");
//const P3 = g.addAtom("P3");
//const P4 = g.addAtom("P4");
//
//g.addClause([P1, P2, P3]);
//g.addClause([-P1, P2, -P4]);
//g.addClause([-P1, P3]);
//g.addClause([-P1, -P3, P4]);
//g.addClause([P1, -P3]);
//g.addClause([-P2]);
//
//console.log(dpll(g));
