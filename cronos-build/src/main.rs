use std::process::{Command, Stdio};

fn main() {
    let mut node = Command::new("powershell")
        .arg("npx")
        .arg("swc")
        .arg("./src/index.ts")
        .arg("-d")
        .arg("build")
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .spawn()
        .expect("failed to execute process");

    node.wait().unwrap();
}
