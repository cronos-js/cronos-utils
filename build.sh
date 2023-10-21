cd cronos-watch &&
cross build --target x86_64-pc-windows-gnu &&
cross build --target x86_64-unknown-linux-musl &&

cd ../cronos-preview &&
cross build --target x86_64-pc-windows-gnu &&
cross build --target x86_64-unknown-linux-musl