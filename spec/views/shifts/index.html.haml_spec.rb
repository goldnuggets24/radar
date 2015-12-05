require 'rails_helper'

RSpec.describe "shifts/index", type: :view do
  before(:each) do
    assign(:shifts, [
      Shift.create!(),
      Shift.create!()
    ])
  end

  it "renders a list of shifts" do
    render
  end
end
