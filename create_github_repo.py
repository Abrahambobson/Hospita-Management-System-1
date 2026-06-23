import getpass
import json
import os
import urllib.request
from dulwich import porcelain
from pathlib import Path

repo_name = "Hospital-Management"
owner = "Abrahambobson"


def get_token():
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if token:
        return token.strip()

    print("GitHub personal access token is required to create the repository and push.")
    print("Create one in GitHub settings with repo scope, then enter it below.")
    return getpass.getpass("GitHub token: ").strip()


def github_request(url, method="GET", token=None, data=None):
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json",
        "User-Agent": "hospital-management-init-script",
    }
    payload = None
    if data is not None:
        payload = json.dumps(data).encode("utf-8")
        headers["Content-Type"] = "application/json"

    request = urllib.request.Request(url, data=payload, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8")
        return {"error": True, "code": exc.code, "reason": exc.reason, "body": body}


def ensure_repo_exists(token):
    repo_url = f"https://api.github.com/repos/{owner}/{repo_name}"
    response = github_request(repo_url, method="GET", token=token)
    if isinstance(response, dict) and response.get("error"):
        if response["code"] == 404:
            print("Repository not found. Creating new repository...")
            create_url = "https://api.github.com/user/repos"
            payload = {
                "name": repo_name,
                "description": "Hospital Management System project generated locally.",
                "private": False,
                "has_issues": True,
                "has_projects": True,
                "has_wiki": True,
            }
            create_response = github_request(create_url, method="POST", token=token, data=payload)
            if isinstance(create_response, dict) and create_response.get("error"):
                print("Failed to create repository:")
                print(create_response)
                raise SystemExit(1)
            print("Repository created:", create_response.get("html_url"))
            return create_response["clone_url"]
        print("GitHub API error:")
        print(response)
        raise SystemExit(1)

    print("Repository already exists:", response.get("html_url"))
    return response.get("clone_url")


def push_local_repo(token, clone_url):
    repo_dir = Path(__file__).resolve().parent
    remote_url = clone_url.replace("https://", f"https://{owner}:{token}@")
    print("Pushing local repository to", remote_url)
    result = porcelain.push(
        repo=str(repo_dir),
        remote_location=remote_url,
        refspecs=[b"refs/heads/master:refs/heads/master"],
        username=owner,
        password=token,
    )
    print(result)
    print("Push complete.")


def main():
    
    token = get_token()
    clone_url = ensure_repo_exists(token)
    push_local_repo(token, clone_url)


if __name__ == "__main__":
    main()
