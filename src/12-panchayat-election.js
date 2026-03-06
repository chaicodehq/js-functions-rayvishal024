/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
 
  
  // declare private member
  let votes = {};
  let registered = new Set();
  let voters = new Set();
  
  // All candidate vote is 0
  for (const c of candidates) {
    votes[c.id] = 0;
  }

  // registerVoter methode
  let registerVoter = (voter) => {

    // validate voter and age
    if (typeof voter !== "object" || voter === null || Object.keys(voter).length != 3 || voter.age < 18 )
      return false;

    // check for already register
    if (registered.has(voter.id))
      return false;

    // add new voter
    registered.add(voter.id);

    return true;

  }

  // 
  let castVote = (voterId, candidateId, onSuccess, onError) => {

    // voterId existence check
    if (!registered.has(voterId)) {
      return onError("voter not registered");
    }

    // now check candidate existence
    if (!(candidateId in votes)) {
      return onError("candidate does't exist");
    }

    // check for already vote
    if (voters.has(voterId)) {
      return onError("voter already voted");
    }

    // add their vote & increase candidate vote
    votes[candidateId]++;
    voters.add(voterId);

    return onSuccess({ voterId, candidateId });
    
  }
  
  
  const getResults = (sortFn) => {

    // mapping candidate first
    let results = candidates.map(cand => ({
      id: cand.id,
      name: cand.name,
      party: cand.party,
      votes: votes[cand.id]
    }));


    // check for sort methode
    if (sortFn) {
      results.sort(sortFn);
    } else {

      // into decending order
      results.sort((a, b) => b.votes - a.votes);
    }

    return results;
  }


  const getWinner = () => {

    // call getResult for result of election
    const results = getResults();

    // validate result
    if (results.length === 0 || results[0].votes === 0) {
      return null;
    }

      // first index is winner
    const winnerId = results[0].id;

    // finding into candidate array for details
    return candidates.find(c => c.id === winnerId);

  }

  return {
    registerVoter,
    getResults,
    getWinner,
    castVote
  }
 
  
}

export function createVoteValidator(rules) {
  
  rules.requiredFeilds = ["id", "name", "age"];

  return (voter) => {
    // valiate feild
    let isValid = rules.requiredFeilds.every((rule) => (voter.hasOwnProperty(rule)));
    
    if (!isValid)
      return {
        valid: false,
        reason : "required All Feilds"
      }
    
    // check age
    if (voter.age < 18) {
      return {
        valid: false,
        reason : "Minimum age is 18"
      }
    }

    return {
      valid: true,
      reason  : "All feild exist & voter age is more than 18"
    }
  }
  
}

export function countVotesInRegions(regionTree) {
 
  // validate regionTree
  if (typeof regionTree !== "object" || regionTree === null)
    return 0;

  // assign total votes
  let totalVotes = regionTree.votes || 0;

  // validate subregion
  if (!Array.isArray(regionTree.subRegions)) {
    return totalVotes;
  }

 // apply loop & recusion 
  for (let subRegion of regionTree.subRegions) {
    totalVotes += countVotesInRegions(subRegion)
  }

  return totalVotes;

}

export function tallyPure(currentTally, candidateId) {
   
  // find candidateId in currentTally
  for (let candi in currentTally) {
    if (candi === candidateId) {
   
      let newObj = { ...currentTally };
      newObj[candi] += 1;

      return newObj;
    }
  }

  currentTally[candidateId] = 1;
  return { ...currentTally }
  
}
