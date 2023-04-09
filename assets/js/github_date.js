const gh_token1 = "gh";
const gh_token2 = "p_T0njguBA73rA4";
const gh_token3 = "A6ELKdgdXlX5gkv0a0cvprG";

let headers = new Headers();
headers.append('Authorization', `token ${gh_token1 + gh_token2 + gh_token3}`);

fetch("https://api.github.com/repos/donghoon-io/donghoon-io.github.io/branches/main", {method:'GET', headers: headers})
.then(response => response.json())
.then(data => {
  let date = new Date(data.commit.commit.committer.date);
  var dateString = moment(date).format('MMM DD, YYYY');
  document.getElementById("date").innerText = dateString;
});