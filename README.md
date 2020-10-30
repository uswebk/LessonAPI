# Docker Command
1. コンテナに入る
   - docker exec -it rest-api bash
   - npm init
   - npm install --save express sqlite3 body-parser node-dev
2. コンテナを停止
    - docker-compose stop
3. コンテナ停止 & 削除(イメージも含む)
    - docker-compose down -v --rmi all
