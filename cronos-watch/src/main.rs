use std::env;
use std::env::consts::OS;
use std::process::{Command, Stdio};

fn main() {
    let args: Vec<_> = env::args().collect();

    if args.len() > 1 {
        if args[1] == "--express" {
            let mut node = if OS == "linux" {
                Command::new("npx")
                    .arg("nodemon")
                    .arg("--exec")
                    .arg("ts-node")
                    .arg("src/index.ts")
                    .stdout(Stdio::inherit())
                    .stderr(Stdio::inherit())
                    .spawn()
                    .expect("failed to execute process")
            } else {
                Command::new("powershell")
                    .arg("npx")
                    .arg("nodemon")
                    .arg("--exec")
                    .arg("ts-node")
                    .arg("src/index.ts")
                    .stdout(Stdio::inherit())
                    .stderr(Stdio::inherit())
                    .spawn()
                    .expect("failed to execute process")
            };

            node.wait().unwrap();
        } else if args[1] == "--react" {
            let mut node = if OS == "linux" {
                Command::new("npx")
                    .arg("rspack")
                    .arg("serve")
                    .stdout(Stdio::inherit())
                    .stderr(Stdio::inherit())
                    .spawn()
                    .expect("failed to execute process")
            } else {
                Command::new("powershell")
                    .arg("npx")
                    .arg("rspack")
                    .arg("serve")
                    .stdout(Stdio::inherit())
                    .stderr(Stdio::inherit())
                    .spawn()
                    .expect("failed to execute process")
            };

            node.wait().unwrap();
        }
    }
}
