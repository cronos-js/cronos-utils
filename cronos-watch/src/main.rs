use std::process::{Command, Stdio};

fn main() {
    let mut node = Command::new("powershell")
        .arg("npx")
        .arg("nodemon")
        .arg("--exec")
        .arg("ts-node")
        .arg("src/index.ts")
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .spawn()
        .expect("failed to execute process");

    node.wait().unwrap();
}
