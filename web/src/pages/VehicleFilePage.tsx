import { useMemo, useState } from 'react'
import {
  App as AntApp,
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd'
import {
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import styles from './vehicle-file-page.module.less'

type FileRow = {
  id: string
  model: string
  vin: string
  name: string
  startTime: string
  endTime: string
  size: string
  operator: string
  createdAt: string
  uploadedAt?: string
  status: '上传完成' | '上传失败' | '待上传'
}

const { RangePicker } = DatePicker

const initialData: FileRow[] = [
  {
    id: '1',
    model: 'J01',
    vin: 'LFVVA9E15R3000038',
    name: '20M',
    startTime: '2024-04-20 12:00:00',
    endTime: '2024-04-20 12:00:00',
    size: '20M',
    operator: '系统',
    createdAt: '2024-04-20 12:00:00',
    uploadedAt: '2024-04-20 12:00:00',
    status: '上传完成',
  },
  {
    id: '2',
    model: 'J01',
    vin: 'LFVVA9E15R3000038',
    name: '20M',
    startTime: '2024-04-20 12:00:00',
    endTime: '2024-04-20 12:00:00',
    size: '20M',
    operator: '系统',
    createdAt: '2024-04-20 12:00:00',
    status: '上传失败',
  },
  {
    id: '3',
    model: 'J01',
    vin: 'LFVVA9E15R3000038',
    name: '20M',
    startTime: '2024-04-20 12:00:00',
    endTime: '2024-04-20 12:00:00',
    size: '20M',
    operator: '系统',
    createdAt: '2024-04-20 12:00:00',
    uploadedAt: '2024-04-20 12:00:00',
    status: '上传完成',
  },
]

export default function VehicleFilePage() {
  const [form] = Form.useForm()
  const [data] = useState<FileRow[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [openTip, setOpenTip] = useState(false)

  const columns = useMemo(() => {
    return [
      {
        title: '',
        dataIndex: 'checkbox',
        width: 48,
      },
      {
        title: '车型',
        dataIndex: 'model',
        width: 100,
      },
      {
        title: 'VIN',
        dataIndex: 'vin',
        width: 220,
        render: (v: string) => (
          <Tooltip title={v}>
            <span>{v}</span>
          </Tooltip>
        ),
      },
      {
        title: '文件名称',
        dataIndex: 'name',
        width: 120,
        render: (v: string) => (
          <a onClick={() => {}}>{v}</a>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        width: 180,
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        width: 180,
      },
      {
        title: '大小',
        dataIndex: 'size',
        width: 90,
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        width: 100,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 180,
      },
      {
        title: '上传时间',
        dataIndex: 'uploadedAt',
        width: 180,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        render: (status: FileRow['status']) =>
          status === '上传完成' ? (
            <Tag color="success">{status}</Tag>
          ) : status === '上传失败' ? (
            <Tag color="error">{status}</Tag>
          ) : (
            <Tag color="default">{status}</Tag>
          ),
      },
      {
        title: '操作',
        key: 'actions',
        fixed: 'right' as const,
        width: 140,
        render: () => (
          <Space size={8}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
            <Button size="small" type="link" icon={<CloudDownloadOutlined />}>下载</Button>
          </Space>
        ),
      },
    ]
  }, [])

  function onSearch() {
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  function onReset() {
    form.resetFields()
  }

  function onRefreshList() {
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  function onBatchUpload() {
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  function onBatchDownload() {}

  return (
    <AntApp>
      <div className={styles.page}>
        <div className={styles.backBar}>
          <a>{'< 远程调取/查询'}</a>
        </div>

        <div className={styles.panel}>
          <Form
            form={form}
            layout="inline"
            className={styles.searchForm}
            initialValues={{
              model: 'J01',
              vin: 'LFVVA9E15R3000038',
              time: [dayjs('2015-10-02'), dayjs('2015-10-10')],
            }}
          >
            <Form.Item label="车型" name="model">
              <Select style={{ width: 160 }}
                options={[{ value: 'J01', label: 'J01' }, { value: 'J02', label: 'J02' }]} />
            </Form.Item>
            <Form.Item label="VIN" name="vin">
              <Input style={{ width: 280 }} placeholder="请输入VIN" />
            </Form.Item>
            <Form.Item label="文件时间" name="time">
              <RangePicker style={{ width: 320 }} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>查询</Button>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>

          <Divider style={{ margin: '12px 0' }} />

          <Flex justify="space-between" align="center" className={styles.toolbar}>
            <Space>
              <Button icon={<ReloadOutlined />} onClick={onRefreshList}>更新车辆清单</Button>
              <Button icon={<CloudUploadOutlined />} onClick={onBatchUpload}>批量提取文件</Button>
              <Button icon={<CloudDownloadOutlined />} onClick={onBatchDownload}>批量下载文件</Button>
              <Button>ASC转换</Button>
            </Space>
            <Button type="text" icon={<SyncOutlined spin />} onClick={onRefreshList} />
          </Flex>

          <div className={styles.tableWrap}>
            <Table
              size="middle"
              rowKey="id"
              loading={loading}
              columns={columns as any}
              dataSource={data}
              pagination={false}
              rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
              scroll={{ x: 1200 }}
            />
            <div className={styles.paginationBar}>
              <Pagination total={50} current={1} pageSize={10} showSizeChanger showQuickJumper />
            </div>
          </div>
        </div>

        <div className={styles.sideTip}>
          <div className={styles.tipCard}>
            <div className={styles.tipHeader}>
              <ExclamationCircleOutlined />
              <span>提示</span>
            </div>
            <div className={styles.tipBody}>
              <div>信息：当前车辆未获取用户授权，无法采集车辆数据</div>
            </div>
            <div className={styles.tipFooter}>
              <Button type="primary" onClick={() => setOpenTip(true)}>确认</Button>
            </div>
          </div>
        </div>

        <Modal
          title="提示"
          open={openTip}
          onCancel={() => setOpenTip(false)}
          onOk={() => setOpenTip(false)}
          okText="确认"
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          信息：当前车辆未获取用户授权，无法采集车辆数据
        </Modal>
      </div>
    </AntApp>
  )
}

