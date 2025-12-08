import {
  editSavings,
  deleteSavings,
} from '../../../../../lib/actions/savings-actions';

// EDIT SAVINGS
export async function PATCH(req) {
  const { savingsId, savingsTitle, savingsAmount } = await req.json();

  try {
    const result = await editSavings(savingsId, savingsTitle, savingsAmount);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to EDIT savings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE SAVINGS
export async function DELETE(req) {
  const { savingsId } = await req.json();

  try {
    const result = await deleteSavings(savingsId);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'Failed to EDIT savings' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
