import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Title, Table, Button, Column} from 'rbx'
import dbConnection from '../../lib/database'


function ProjectTaskList(props) {

  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>To-do List</title>
      </Head>
      <Container>
        <Column.Group>
          <Column>
            <Title>{props.data[0].project_name}</Title>
          </Column>
          <Column>
            <Title align="right">
              {props.data.reduce((sum, cur) => sum + parseInt(cur.estimated_hours), 0)} hours
            </Title>
          </Column>
        </Column.Group>
        <Table fullwidth striped>
          <Table.Head>
            <Table.Row>
              {['Task', 'Assigned To', 'Estimated Hours'].map((s, i) =>
                <Table.Heading key={i}>{s}</Table.Heading>
              )}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {props.data.map((row,i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  {row.task_description}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/user/${row.member_name}`}>
                    <a>{row.member_name}</a>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  {row.estimated_hours}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Button onClick={() => router.back()}>Back</Button>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const id = context.query.id

  const db = await dbConnection;

  let data = await db.query({
      sql : `select estimated_hours,
     task_description,
     m.name as member_name,
     p.name as project_name
from assignment a
   join member m on a.member_id = m.member_id
   join project p on p.project_id = a.project_id
where a.project_id = ?;`,
      values : [id]
    }
  )

  // Project with no assignments may return no data, so fetch project name directly if needed
  if (data.length === 0) {
    data = await db.query({
      sql : `select name, 0 as estimated_hours as project_name from project where project_id = ?`,
      values : [id]
    })
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }
  }

}

export default ProjectTaskList
