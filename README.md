# 这是一个后台管理项目
* git指令-1
	* git init 初始化本地Git版本库
	* git branch 查看本地所有分支
	* git branch dev 创建dev分支
	* git branch -d dev 删除dev分支
	* git checkout dev 切换到dev分支
	* git checkout -b dev 新建并切换到dev分支（会将当前分支的代码复制dev分支）
* git指令-2
	* git add .
	* git commit -m ''
	* git push origin master
* git指令-3
	* git clone #远程仓库地址# 将远程仓库克隆到本地仓库
	* git remote add origin #地址# 本地已有仓库，关联远程仓库
	* git fetch origin dev:dev 拉取远程仓库dev分支内容，到本地仓库dev分支上
* git指令-4
	* git reset --hard HEAD^ 回退到上一版本