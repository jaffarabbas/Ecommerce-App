using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerseAppDtos.Dtos;

[Table("USER_ORDERS")]
public partial class UserOrder
{
    [Key]
    [Column("oid")]
    public int Oid { get; set; }

    [Column("uid")]
    public int Uid { get; set; }

    [Column("pid")]
    public int Pid { get; set; }

    [Column("quantity")]
    public int Quantity { get; set; }

    [Column("total_price", TypeName = "decimal(10, 2)")]
    public decimal TotalPrice { get; set; }

    [Required]
    [Column("status")]
    public bool? Status { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [ForeignKey("Pid")]
    [InverseProperty("UserOrders")]
    public virtual Product PidNavigation { get; set; } = null!;

    [ForeignKey("Uid")]
    [InverseProperty("UserOrders")]
    public virtual User UidNavigation { get; set; } = null!;
}
