const gh_token = "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";

let headers = new Headers();
headers.append('Authorization', `token ${gh_token}`);

fetch("https://api.github.com/repos/donghoon-io/donghoon-website/branches/main", {method:'GET', headers: headers})
.then(response => response.json())
.then(data => {
  let date = new Date(data.commit.commit.committer.date);
  var dateString = moment(date).format('MMM DD, YYYY');
  document.getElementById("date").innerText = dateString;
});