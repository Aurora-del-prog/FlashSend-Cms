import { PageParams } from '@/services/system/user/type';
import user from '@/services/system/user/user';
import { User } from '@/services/user/type';
import { useUserStore } from '@/store/user/user';
import { formatDate } from '@/utils/util';
import { Button, Form, Input, Modal, Pagination, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { memo, useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import Modals from './modal/Modals'
import { IAction } from '@/services/system/modal/type';
import { message } from '@/components/Message/GlobalMessage';

const index = memo(() => {
	const [form] = Form.useForm();
	const [data,setData] = useState<User.UserItem[]>([])
	const [total,setTotal] = useState(0)
	const [pagination,setPagination] = useState({
		current:1,
		pageSize: 10
	})
	const userInfo = useUserStore(state => state.userInfo)
  const [userIds, setUserIds] = useState<number[]>([])
	const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()

	useEffect(() => {
		getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
	}, [pagination.current, pagination.pageSize])



	// 获取用户列表
	const getUserList = async (params: PageParams) => {
		// 获取搜索框数据
		const values = form.getFieldsValue()
		const data = await user.getUserList({
			...values,
			pageNum:params.pageNum,
			pageSize: params.pageSize || pagination.pageSize
		})
		// let list = []
		// if(data.list.length <= 1){
		// 	list = Array.from({length: 50})
		// 	.fill({})
		// 	.map((item: any) => {
		// 		item = {...data.list[0]}
		// 		item.userId = Math.random()
		// 		return item
		// 	})
		// }
		// list = list || data?.list
		setData(data?.list)
		setTotal(data.page.total)
    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize
    })

	}
	const handleSearch = () => {
		getUserList({
      pageNum: 1
    })
	}
	const handleReset = () => {
		form.resetFields()
	}

	// 创建用户
	const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
		// console.log(record)
    userRef.current?.open('edit', record)
  }


  // 删除用户
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

	// 批量删除确认
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }

	// 公共删除用户接口
  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await user.delUser({
        userIds: ids
      })
      message.success('删除成功')
      setUserIds([])
      getUserList({
        pageNum: 1
      })
    } catch (error) {
			console.log(error)
		}
  }

	const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
			align:'center'
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
			align:'center'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
			align:'center'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
			align:'center',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
			align:'center',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
			align:'center',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'address',
			align:'center',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)} >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
	return (
		<div className={styles.list} >
			<Form className='search-form' form={form} layout='inline' initialValues={{ state: 1 }}>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}
						style={{marginRight: '10px'}}
						>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
			<div className="base-table">
				<div className='header-wrapper'>
					<div className='title'>用户列表</div>
					<div className='action'>
						<Button type='primary' onClick={handleCreate}>
							新增
						</Button>
						<Button type='primary' danger onClick={handlePatchConfirm}>
							批量删除
						</Button>
					</div>
				</div>
				<Table
					bordered
					rowKey='userId'
					rowSelection={{
						type: 'checkbox',
						selectedRowKeys: userIds,
						onChange: (selectedRowKeys: React.Key[]) => {
							setUserIds(selectedRowKeys as number[])
						}
					}}
					dataSource={data}
					columns={columns}
					pagination={{
						total,
						showQuickJumper: true,
						showSizeChanger: true,
						showTotal: function (total) {
							return `总共：${total}条`
						},
						onChange: (page, pageSize) => {
							setPagination({
								current: page,
								pageSize
							})
						}
					}}
				/>
			</div>
			<Modals
				mRef={userRef}
				update={() => {
          getUserList({
            pageNum: 1
          })
        }}
			/>
		</div>
	)
})

export default index
