# Jenkins

## install Docker
> https://www.jenkins.io/zh/doc/book/installing/
> https://docs.docker.com/engine/install/centos/

一步一步安装即可

### 坑
#### 1. docker x509: certificate has expired or is not yet valid
> https://www.jianshu.com/p/9b23678abcc4

服务器时间错误

```sh
data
yum install ntpdate
ntpdate cn.pool.ntp.org   
date
sudo docker run hello-world
```

### 启动/停止 docker
```sh
systemctl start   docker
# mac 使用 launchctl 命令代替 systemctl
systemctl status  docker
systemctl stop    docker
systemctl restart docker
# 开机启动docker
systemctl enable  docker
docker info
```

### 镜像
> 一层层只读
```sh
# 查看本地镜像
docker images 
# 搜索镜像
docker search 镜像名称
# 拉取镜像
docker pull   镜像名称:version
# 删除镜像
docker stop   基于镜像id的容器名称
docker rm     基于镜像id的容器名称
docker rmi    镜像id
# 删除所有镜像
docker rmi `docker images -q`
```

### 容器
> 一层层只读 + 可写层
```sh
# 交互式创建容器，直接进入容器
docker -it --name=容器名称 镜像名称:标签 /bin/bash
# 守护式创建容器
docker -di --name=容器名称 镜像名称:标签
# 进入容器内部
docker exec 容器名称 /bin/bash
# 查看容器状态
docker ps
docker ps -a
# 退出容器
exit
# 启动/停止/删除容器
docker start 容器名称
docker stop  容器名称
docker rm    容器名称
# 拷贝容器内容
docker cp 需要拷贝的文件或目录 容器名称:目标路径
docker cp 容器名称:目标路径 需要拷贝的文件或目录 
```

## 容器迁移
```sh
# 容器保存为镜像
docker commit 容器名称 镜像名称1
# 根据镜像构建新的容器
docker -it --name=新容器名称 -p端口:端口 镜像名称1
# 导出镜像
docker save -o 导出镜像名.tar 镜像名称
# 删除镜像
docker stop   基于镜像id的容器名称
docker rm     基于镜像id的容器名称
docker rmi    镜像id
# 恢复镜像
docker load -i 导出镜像名.tar
```


## install Jenkins
```sh
docker run \
  -u root \
  --rm \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkinsci/blueocean
```

after install ok visit http://localhost:8080/

```sh
# 查看容器id
docker ps 
# 进入容器内部
docker exec -it 容器id bash
# 查看秘钥
cat /var/jenkins_home/secrets/initialAdminPassword
```




## try use Jenkins
> https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/#setup-wizard



http://callmedadaxin.github.io/2018/07/20/jenkins-github-hook/