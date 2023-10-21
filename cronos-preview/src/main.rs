use salvo::prelude::*;
use salvo::serve_static::StaticDir;
use std::env;
use std::process::{Command, Stdio};

#[tokio::main]
async fn main() {
    let args: Vec<_> = env::args().collect();

    if args.len() > 1 {
        if args[1] == "--express" {
            let mut node = Command::new("node")
                .arg("./build/index.js")
                .stdout(Stdio::inherit())
                .stderr(Stdio::inherit())
                .spawn()
                .expect("failed to execute process");

            node.wait().unwrap();
        } else if args[1] == "--react" {
            let router = Router::with_path("<**path>").get(
                StaticDir::new([
                    "dist"
                ])
                .defaults("index.html")
                .listing(true),
            );
        
            println!("🚀 Server is running on http://localhost:5800");

            let acceptor = TcpListener::new("127.0.0.1:5800").bind().await;
            Server::new(acceptor).serve(router).await;
        }
    }
}
