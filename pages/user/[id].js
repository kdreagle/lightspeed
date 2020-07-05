import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Title, Table, Button } from 'rbx'
import dbConnection from '../../lib/database'


function UserProjectList(props) {
  function ucwords(str) {
    return str ? str.slice(0,1).toUpperCase() + str.slice(1) : ''
  }

  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>To-do List</title>
      </Head>
      <Container>
        <Title>{ucwords(id)}'s Project List</Title>
        <Table fullwidth striped>
          <Table.Head>
            <Table.Row>
              {['Project', 'Members', 'Estimated Hours', 'Actions'].map((s, i) =>
                <Table.Heading key={i}>{s}</Table.Heading>
              )}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {props.data.map((row,i) =>
              <Table.Row key={i}>
                <Table.Cell>
                  {row.project_name}
                </Table.Cell>
                <Table.Cell>
                  {row.members}
                </Table.Cell>
                <Table.Cell>
                  {row.estimated_hours}
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/project/${row.project_id}`}>
                    <Button>View</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const name = context.query.id

  const db = await dbConnection;

  const data = await db.query({
      sql : `select t.name as project_name,
     replace((select group_concat(distinct m2.name)
        from member m2
           join assignment a2 on m2.member_id = a2.member_id
        where t.project_id = a2.project_id), ',', ', ') as members,
     (select sum(estimated_hours)
        from member m2
           join assignment a2 on m2.member_id = a2.member_id
        where t.project_id = a2.project_id) as estimated_hours,
      t.project_id
    from (select p.name,
           p.project_id
        from member m
           join assignment a on a.member_id = m.member_id
           join project p on p.project_id = a.project_id
    where m.name = ?
    group by p.project_id) t`,
      values : [name]
    }
  )

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }
  }

}

export default UserProjectList
