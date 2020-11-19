class CNF {

	constructor() {
		this.nextAtom = 1;
		this.atoms = {};
		this.clauses = [];
	}

	addAtom(name) {
		const atom = this.nextAtom++;
		this.atoms[atom] = name;
		return atom;
	}

	addClause(clause) {
		this.clauses.push(clause);
		}

	popClause() {
		if (this.clauses.length > 0) {
			return this.clauses.pop();
		}
		return undefined;
	}

	literalToString(literal) {
		return (literal < 0 ? "!" : "") + this.atoms[Math.abs(literal)] || "?";
	}

	toString() {
		return this.clauses.map(
			clause => "(" + clause.map(
				literal => this.literalToString(literal)
			).join(" ∨ ") + ")"
		).join(" ∧\n");
	}

	copy() {
		const cnf = new CNF();
		cnf.nextAtom = this.nextAtom;
		cnf.atoms = {...this.atoms};
		cnf.clauses = [...this.clauses];
		return cnf;
	}

}
