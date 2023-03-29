#!/usr/bin/env bash

# docker login registry.cn-hangzhou.aliyuncs.com --username=lidongwei@haokan
registry=registry.ap-southeast-1.aliyuncs.com/hk-java/hk-open-ai

version=$(date +%y%m%d%H%M)
echo 开始打包，版本号：${1}${version}
rm -rf build
case "$1" in
    dev)
        npm run build && \
        docker build -t ${registry}:${1}${version} . && \
        docker push ${registry}:${1}${version} && \
        docker tag  ${registry}:${1}${version} ${registry}:test && \
        docker push ${registry}:test 
        ;;
    prod)
        npm run build  && \
        docker build -t ${registry}:${1}${version} .  && \
        docker push ${registry}:${1}${version}  && \
        docker tag  ${registry}:${1}${version} ${registry}:latest  && \
        docker push ${registry}:latest
        # curl 'https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjMmU1ZDUzN2NlNmRhNGQyZWI4NjBkMDUwNzZjOWE2MGIiLCJpZCI6IjIyMTM3NiJ9.mjS7ZT22GZ9wzx9Fd7Io3lTu1ZMVlsRISHX8JD2QrX61dzDawF00ljnP-L1vqPP8oG66XCXJSuctPTSzi3qikzuPJdg56JUhO-MHExUEJyq9Lp-4LKlukigurAy4PuSRe9MDrubIvfltjwqTaDwY1MtbceIOvFgIkufc_nhGzlo'
        ;;
    *)
        echo '缺少参数 dev 或 prod '
        exit 3
        ;;
esac
docker rmi -f $(docker images | awk '/hk-open-ai/ { print $3 }' | sed -n '3,$p')
exit 0
