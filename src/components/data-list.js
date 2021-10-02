export default function DataList(props) {
  const { year, data } = props;

  return (
    <div style={{margin: '30px'}}>
      <label style={{ fontWeight: 'bold' }}>{year}</label>
      <br />
      <table>
        <thead>
          <th style={{padding: '20px'}}>Date Submitted</th>
          <th style={{padding: '20px'}}>Original Input</th>
          <th style={{padding: '20px'}}>Date in ISO Format</th>
        </thead>

        <tbody>
          {data.map((element) => (
            <tr>
              <td>{element.dateSubmitted}</td>

              <td>{element.originalDate}</td>

              <td>{element.isoDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
