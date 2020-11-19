function isEmpty(cnf) {
	return cnf.clauses.length == 0;
}

function hasEmptyClause(cnf) {
	return cnf.clauses.some(clause => clause.length == 0);
}

function popSingleClause(cnf) {
	const idx = cnf.clauses.findIndex(clause => clause.length == 1);
	if (idx === -1)
		return undefined;

	const singleClause = cnf.clauses[idx];
	cnf.clauses = [
		...cnf.clauses.slice(0, idx),
		...cnf.clauses.slice(idx + 1)
	];

	return singleClause;
}

function getAnyAtom(cnf) {
	return Math.abs(cnf.clauses[0][0]);
}

function reduceClauses(cnf, literal) {
	const newClauses = [];

	cnf.clauses.map(clause => {
		let newClause = clause;

		if (!clause.includes(literal)) {
			if (clause.includes(-literal)) {
				newClauses.push(clause.filter(_literal => _literal != -literal));
			} else {
				newClauses.push(clause);
			}
		}
	});

	cnf.clauses = newClauses;
	return cnf;
}

function dpll(_cnf, _depth, _assignment) {
	const depth = _depth===undefined ? 1 : _depth;
	const assignment = _assignment===undefined ? [] : _assignment;
	const cnf = _cnf.copy();
	console.log(cnf.toString());

	if (depth > 8)
		throw "Maximum recursion depth reached";

	if (isEmpty(cnf))
		return [true, assignment];

	if (hasEmptyClause(cnf))
		return [false, []];

	const singleClause = popSingleClause(cnf);

	if (singleClause !== undefined) {
		reduceClauses(cnf, singleClause[0]);
		console.log("single", cnf.literalToString(singleClause[0]), assignment);
		return dpll(cnf, depth+1, [...assignment, singleClause[0]]);
	} else {
		const atom = getAnyAtom(cnf);

		console.log("guess", cnf.literalToString(atom));
		cnf.addClause([atom]);
		const [ok1, ass1] = dpll(cnf, depth+1, [...assignment, atom]);
		if (ok1)
			return [true, ass1];
		cnf.popClause();

		console.log("guess", cnf.literalToString(-atom));
		cnf.addClause([-atom]);
		assignment.push(-atom);
		const [ok2, ass2] = dpll(cnf, depth+1, [...assignment, -atom]);
		if (ok2)
			return [true, ass2];

		return [false, []];
	}
}
