export const fetchCommit = async () => {
  const isCached = localStorage.getItem("latestCommitCached");
  const cachedTime = localStorage.getItem("latestCommitCachedTimestamp");

  if (isCached && cachedTime) {
    const currTime = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (currTime - Number(cachedTime) < oneDay) {
      const cachedDate = localStorage.getItem("latestCommitDate");
      if (cachedDate) {
        document.getElementById("commit-date").textContent = cachedDate;
        return;
      }
    }
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/temttae/minimal-me/commits"
    );
    const data = await response.json();

    if (data[0]) {
      const rawDate = data[0].commit.committer.date;
      const date = new Date(rawDate);

      let cDate =
        date.getHours() +
        ":" +
        String(date.getMinutes()).padStart(2, "0") +
        ", " +
        date.toDateString();
      
      localStorage.setItem("latestCommitDate", cDate);
      localStorage.setItem(
        "latestCommitCachedTimestamp",
        Date.now().toString()
      );
      localStorage.setItem("latestCommitCached", "true");
     
      document.getElementById("commit-date").textContent = "Updated on " + cDate;
    } else {
      document.getElementById("commit-date").textContent = "";
    }
  } catch {}
};
